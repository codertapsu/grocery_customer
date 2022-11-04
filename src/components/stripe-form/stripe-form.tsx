import { FC, useRef } from 'react';
import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';

import { Button } from '@components/button';
import { useHttpClient } from '@contexts/http-client';
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripeCardNumberElementOptions } from '@stripe/stripe-js';

interface FormValue {
  name: string;
  postalCode: string;
}

interface Props {
  onCreatedPaymentMethod?: (paymentMethodId: string) => void;
}

const options: StripeCardNumberElementOptions = {
  style: {
    base: {
      iconColor: '#666EE8',
      lineHeight: '38px',
      fontWeight: 300,
      color: '#777',
      fontSize: '14px',

      ':focus': {},

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
  },
  placeholder: '',
};

export const StripeForm: FC<Props> = ({ onCreatedPaymentMethod }) => {
  const httpClient = useHttpClient();
  const stripe = useStripe();
  const elements = useElements();
  const card = useRef<any>();

  const { register, handleSubmit } = useForm<FormValue>({
    mode: 'onBlur',
    shouldFocusError: false,
  });

  const registerOptions: Record<keyof FormValue, RegisterOptions> = {
    name: {},
    postalCode: {},
  };

  const onCreatedPaymentMethod2 = async (paymentMethodId: string) => {
    // httpClient
    //   .post('/credit-cards', { paymentMethodId: paymentMethod.id })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    const { data } = await httpClient.post<any>('/charge/intent', {
      paymentMethodId,
      amount: 100,
    });
    if (data.actionRequired) {
      // We perform 3D Secure authentication
      const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret);
      if (error) {
        console.log('Error in payment, please try again later');
      }
      if (paymentIntent.status === 'succeeded') {
        console.log(`Payment successful, payment ID - ${paymentIntent.id}`);
      }
      const res2 = await httpClient.get(`/charge/check/${paymentIntent.id}`);
      console.log(`Payment successful, payment ID - ${paymentIntent.id}`);
    } else {
      // Simple HTTP Payment was successful
      console.log(`Payment successful, payment ID - ${data.id}`);
    }
    // const result = await httpClient.post<any>('/charge/confirm', {
    //   paymentMethodId,
    //   paymentIntentId: paymentIntent.id,
    // });
    // console.log(result);
  };

  const handleFormValid = async (data: FormValue) => {
    if (!stripe || !elements) {
      return;
    }
    // try {
    //   const payload = await stripe.createPaymentMethod({
    //     type: 'card',
    //     card: elements.getElement(CardNumberElement),
    //   });
    //   if (payload.paymentMethod) {
    //     onCreatedPaymentMethod(payload.paymentMethod);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    // const address = cardInfo.address;
    const billingDetails = {
      name: 'HOANG DUY KHANH',
      address: {
        country: 'VN',
        state: 'Danang',
        city: 'Danang',
        line1: 'Cam Le',
      },
    };

    try {
      stripe
        .createPaymentMethod({
          type: 'card',
          billing_details: billingDetails,
          card: elements.getElement(CardNumberElement),
        })
        .then(({ paymentMethod }) => {
          onCreatedPaymentMethod2(paymentMethod.id);
        });
    } catch (err) {
      /* Handle Error*/
    }
  };
  const handleError = (errors: FieldErrorsImpl<FormValue>) => {
    console.log(errors);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormValid, handleError)}>
        <h2 className='checkout-title'>Billing Details</h2>
        <div className='row form-group'>
          <div className='col-12'>
            <label className='w-100'>
              <span>Card number *</span>
              <CardNumberElement
                className='stripe-field-container'
                options={options}
                onReady={() => {
                  console.log('CardNumberElement [ready]');
                }}
                onChange={(event) => {
                  console.log('CardNumberElement [change]', event);
                }}
                onBlur={() => {
                  console.log('CardNumberElement [blur]');
                }}
                onFocus={() => {
                  console.log('CardNumberElement [focus]');
                }}
              />
            </label>
          </div>
          <div className='col-12'>
            <label className='w-100'>
              <span>Expiration Date *</span>
              <CardExpiryElement
                className='stripe-field-container'
                options={options}
                onReady={() => {
                  console.log('CardNumberElement [ready]');
                }}
                onChange={(event) => {
                  console.log('CardNumberElement [change]', event);
                }}
                onBlur={() => {
                  console.log('CardNumberElement [blur]');
                }}
                onFocus={() => {
                  console.log('CardNumberElement [focus]');
                }}
              />
            </label>
          </div>
          <div className='col-12'>
            <label className='w-100'>
              <span>CVC *</span>
              <CardCvcElement
                className='stripe-field-container'
                options={options}
                onReady={() => {
                  console.log('CardNumberElement [ready]');
                }}
                onChange={(event) => {
                  console.log('CardNumberElement [change]', event);
                }}
                onBlur={() => {
                  console.log('CardNumberElement [blur]');
                }}
                onFocus={() => {
                  console.log('CardNumberElement [focus]');
                }}
              />
            </label>
          </div>
          <div className='col-12'>
            <label className='w-100'>
              <span>Card holders *</span>
              <input type='text' id='cardName' {...register('name', registerOptions.name)} />
            </label>
          </div>
        </div>
        {/* <CardElement /> */}
        {/* <div className='row'>
          <div className='col-sm-6'>
            <label className='w-100'>
              <span>Card number *</span>
              <CardNumberElement
                className='stripe-field-container'
                options={options}
                onReady={() => {
                  console.log('CardNumberElement [ready]');
                }}
                onChange={(event) => {
                  console.log('CardNumberElement [change]', event);
                }}
                onBlur={() => {
                  console.log('CardNumberElement [blur]');
                }}
                onFocus={() => {
                  console.log('CardNumberElement [focus]');
                }}
              />
            </label>
          </div>
          <div className='col-sm-6'>
            <label className='w-100'>
              <span>Card holders *</span>
              <input type='text' id='cardName' className='form-control' {...register('name', registerOptions.name)} />
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-sm-4'>
            <label className='w-100'>
              <span>Expiration Date *</span>
              <CardExpiryElement
                className='stripe-field-container'
                options={options}
                onReady={() => {
                  console.log('CardNumberElement [ready]');
                }}
                onChange={(event) => {
                  console.log('CardNumberElement [change]', event);
                }}
                onBlur={() => {
                  console.log('CardNumberElement [blur]');
                }}
                onFocus={() => {
                  console.log('CardNumberElement [focus]');
                }}
              />
            </label>
          </div>
          <div className='col-12 col-sm-4'>
            <label className='w-100'>
              <span>CVC *</span>
              <CardCvcElement
                className='stripe-field-container'
                options={options}
                onReady={() => {
                  console.log('CardNumberElement [ready]');
                }}
                onChange={(event) => {
                  console.log('CardNumberElement [change]', event);
                }}
                onBlur={() => {
                  console.log('CardNumberElement [blur]');
                }}
                onFocus={() => {
                  console.log('CardNumberElement [focus]');
                }}
              />
            </label>
          </div>
          <div className='col-12 col-sm-4'>
            <label className='w-100'>
              <span>Postal code *</span>
              <input
                type='text'
                id='cardName'
                className='form-control'
                {...register('postalCode', registerOptions.postalCode)}
              />
            </label>
          </div>
        </div> */}
        <Button type='submit' fillType='filled' cornerType='rounded' themeType='primary'>
          <span>Submit</span>
          <i className='icon-long-arrow-right ms-3' />
        </Button>
      </form>
    </>
  );
};
