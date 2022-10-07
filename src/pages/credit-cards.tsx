import { Breadcrumb } from '@components/breadcrumb';
import { Button } from '@components/button';
import { CreditCard } from '@components/credit-card';
import { Image } from '@components/image';
import { Layout } from '@components/layout';
import { useCart } from '@contexts/cart';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';
import { useFetch } from 'usehooks-ts';
import { loadStripe, PaymentMethod, Stripe } from '@stripe/stripe-js';
import { useHttpClient } from '@contexts/http-client';
import { StripeForm } from '@components/stripe-form';
import { Elements } from '@stripe/react-stripe-js';

const PaymentMethods = [
  {
    id: 1,
    name: 'Direct bank transfer',
    description: `Make your payment directly into our bank account. Please use your Order ID as the payment
    reference. Your order will not be shipped until the funds have cleared in our account.`,
  },
  {
    id: 2,
    name: 'Check payments',
    description: `Make your payment directly into our bank account. Please use your Order ID as the payment
    reference. Your order will not be shipped until the funds have cleared in our account.`,
  },
  {
    id: 3,
    name: 'Cash on delivery',
    description: `Make your payment directly into our bank account. Please use your Order ID as the payment
    reference. Your order will not be shipped until the funds have cleared in our account.`,
  },
  {
    id: 4,
    name: 'Direct bank transfer',
    description: `Make your payment directly into our bank account. Please use your Order ID as the payment
    reference. Your order will not be shipped until the funds have cleared in our account.`,
  },
];

interface FormValue {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface StripeConfig {
  publishKey: string;
  currency: string;
}

const CreditCards: NextPage = () => {
  const httpClient = useHttpClient();
  const minCardYear = new Date().getFullYear();
  const [minCardMonth, setMinCardMonth] = useState<number>(1);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe>>(null);
  const { items, totalPrice } = useCart();
  const { register, handleSubmit, formState, control } = useForm<FormValue>({
    mode: 'onBlur',
  });

  const registerOptions: Record<keyof FormValue, RegisterOptions> = {
    number: { required: false },
    name: { required: false },
    expiry: { required: false },
    cvv: { required: false },
  };

  const onCreatedPaymentMethod = (paymentMethod: PaymentMethod) => {
    httpClient
      .post('/credit-cards', { paymentMethodId: paymentMethod.id })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    // httpClient
    //   .post('/charge', { amount: 100, paymentMethodId: paymentMethod.id })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };
  const handleError = (errors: FieldErrorsImpl<FormValue>) => {
    console.log(errors);
  };

  // const initStripe = async (abortController: AbortController) => {
  //   const response = await httpClient.get<StripeConfig>('/credit-cards/config', { signal: abortController.signal });
  //   SetStripePromise(loadStripe(response.data.publishKey));
  // };

  useEffect(() => {
    const abortController = new AbortController();
    // initStripe(abortController);
    httpClient
      .get<StripeConfig>('/credit-cards/config', { signal: abortController.signal })
      .then((response) => {
        setStripePromise(loadStripe(response.data.publishKey));
      })
      .catch((e) => console.log(e));

    httpClient
      .get<StripeConfig>('/credit-cards', { signal: abortController.signal })
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((e) => console.log(e));

    return () => {
      abortController.abort();
    };
    //
  }, []);

  return (
    <Layout>
      <div className='page-header text-center' style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
        <div className='container'>
          <h1 className='page-title'>
            Checkout<span>Shop</span>
          </h1>
        </div>
      </div>
      <Breadcrumb />
      <div className='page-content'>
        <div className='checkout'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-7'>
                <Elements stripe={stripePromise}>
                  {/* <CardElement /> */}
                  <StripeForm onCreatedPaymentMethod={onCreatedPaymentMethod} />
                  {/* <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                    <h2 className='checkout-title'>Billing Details</h2>
                    <div className='row'>
                      <div className='col-sm-6'>
                        <label htmlFor='cardNumber'>Card number *</label>
                        <input
                          type='text'
                          pattern='[0-9]*'
                          inputMode='numeric'
                          id='cardNumber'
                          className='form-control'
                          {...register('number', registerOptions.number)}
                        />
                      </div>
                      <div className='col-sm-6'>
                        <label htmlFor='cardName'>Card holders *</label>
                        <input
                          type='text'
                          id='cardName'
                          className='form-control'
                          {...register('name', registerOptions.name)}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12 col-sm-4'>
                        <label htmlFor='cardMonth'>Expiration Date *</label>
                        <select id='cardMonth' className='form-control' defaultValue={''}>
                          <option value='' disabled>
                            Month
                          </option>
                          {Array.from({ length: 12 }).map((_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1 < 10 ? '0' + (index + 1) : index + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='col-12 col-sm-4'>
                        <label htmlFor='cardYear' className='opacity-0'>
                          Expiration Year
                        </label>
                        <select id='cardYear' className='form-control' defaultValue={''}>
                          <option value='' disabled>
                            Month
                          </option>
                          {Array.from({ length: 12 }).map((_, index) => (
                            <option key={index} value={minCardYear + index}>
                              {minCardYear + index}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='col-12 col-sm-4'>
                        <label htmlFor='cardCvv'>CVV *</label>
                        <input
                          type='text'
                          id='cardCvv'
                          className='form-control'
                          {...register('cvv', registerOptions.cvv)}
                        />
                      </div>
                    </div>
                    <Button type='submit' fillType='filled' cornerType='rounded' themeType='primary'>
                      <span>Submit</span>
                      <i className='icon-long-arrow-right ms-3' />
                    </Button>
                  </form> */}
                </Elements>
              </div>
              <div className='col-lg-5'>
                <CreditCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreditCards;
