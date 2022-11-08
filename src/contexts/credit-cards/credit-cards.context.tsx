import React, { createContext } from 'react';

import { useHttpClient } from '@contexts/http-client';
import { CreditCard } from '@models/credit-card.model';
import { PaymentIntentResponse } from '@models/payment-intent-response.model';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentMethod, Stripe } from '@stripe/stripe-js';

interface Context {
  addCard: (paymentMethod: PaymentMethod, abortController?: AbortController) => void;
  charge: (
    amount: number,
    paymentMethodId: string,
    abortController?: AbortController,
  ) => Promise<PaymentIntentResponse>;
  checkPayment: (paymentMethodId: string, abortController?: AbortController) => Promise<string>;
  getSavedCards: (abortController?: AbortController) => Promise<CreditCard[]>;
  removeCard: (paymentMethodId: string, abortController?: AbortController) => void;
}

export const CreditCardsContext = createContext<Context>(null);

export const CreditCardsContextProvider = ({ children, stripe }: { children: React.ReactNode; stripe: Stripe }) => {
  const httpClient = useHttpClient();

  const addCard = async (paymentMethod: PaymentMethod, abortController?: AbortController) => {
    const response = await httpClient.post(
      '/credit-cards',
      {
        paymentMethodId: paymentMethod.id,
        fingerprint: paymentMethod.card.fingerprint,
        expMonth: paymentMethod.card.exp_month,
        expYear: paymentMethod.card.exp_year,
      },
      {
        signal: abortController?.signal,
      },
    );
  };

  const removeCard = async (paymentMethodId: string, abortController?: AbortController) => {
    const response = await httpClient.delete(`/credit-cards/${paymentMethodId}`, {
      signal: abortController?.signal,
    });
  };

  const getSavedCards = async (abortController?: AbortController) => {
    const { data } = await httpClient.get<CreditCard[]>('/credit-cards', { signal: abortController?.signal });

    return data;
  };

  const charge = async (amount: number, paymentMethodId: string, abortController?: AbortController) => {
    const { data } = await httpClient.post<PaymentIntentResponse>(
      '/charge/intent',
      {
        paymentMethodId,
        amount,
      },
      {
        signal: abortController?.signal,
      },
    );

    return data;
  };

  const checkPayment = async (paymentMethodId: string, abortController?: AbortController) => {
    const { data } = await httpClient.get<string>(`/charge/check/${paymentMethodId}`, {
      signal: abortController?.signal,
    });

    return data;
  };

  const value: Context = {
    addCard,
    charge,
    checkPayment,
    getSavedCards,
    removeCard,
  };

  return (
    <CreditCardsContext.Provider value={value}>
      <Elements stripe={stripe}>{children}</Elements>
    </CreditCardsContext.Provider>
  );
};
