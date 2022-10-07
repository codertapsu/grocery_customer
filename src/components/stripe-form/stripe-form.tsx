import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';

import { Button } from '@components/button';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethod, StripeCardNumberElementOptions, StripeElementStyle } from '@stripe/stripe-js';

interface FormValue {
  name: string;
  postalCode: string;
}

interface Props {
  onCreatedPaymentMethod?: (paymentMethod: PaymentMethod) => void;
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

export const StripeForm = ({ onCreatedPaymentMethod }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const { register, handleSubmit } = useForm<FormValue>({
    mode: 'onBlur',
    shouldFocusError: false,
  });

  const registerOptions: Record<keyof FormValue, RegisterOptions> = {
    name: { required: 'Name is required' },
    postalCode: { required: 'Password is required' },
  };

  const handleFormValid = async (data: FormValue) => {
    if (!stripe || !elements) {
      return;
    }
    try {
      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
      });
      if (payload.paymentMethod) {
        onCreatedPaymentMethod(payload.paymentMethod);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleError = (errors: FieldErrorsImpl<FormValue>) => {
    console.log(errors);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormValid, handleError)}>
        <h2 className='checkout-title'>Billing Details</h2>
        <div className='row'>
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
        </div>
        <Button type='submit' fillType='filled' cornerType='rounded' themeType='primary'>
          <span>Submit</span>
          <i className='icon-long-arrow-right ms-3' />
        </Button>
      </form>
    </>
  );
};
