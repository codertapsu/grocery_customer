import { FC, useEffect, useState } from 'react';
import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';

import { useCreditCards } from '@contexts/credit-cards';
import { useToast } from '@contexts/toast';
import { mergeClassNames } from '@helpers/merge-class-names.helper';
import { CreditCard as CardShape } from '@models/credit-card.model';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethod, StripeCardNumberElementOptions } from '@stripe/stripe-js';

import { Button } from '../button';
import { CreditCard } from '../credit-card';
import styles from './styles.module.scss';

type FormValue = Pick<CardShape, 'name' | 'brand'>;

interface Props {
  onCreatedPaymentMethod?: (paymentMethodId: string) => void;
}

const options: StripeCardNumberElementOptions = {
  style: {
    base: {
      iconColor: '#666EE8',
      lineHeight: '64px',
      fontWeight: 400,
      color: '#000000',
      fontSize: '16px',

      ':focus': {},

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
  },
  placeholder: '',
};

export const StripeForm: FC<Props> = ({ onCreatedPaymentMethod }) => {
  const toast = useToast();
  const { charge, checkPayment } = useCreditCards();
  const stripe = useStripe();
  const elements = useElements();

  const { register, handleSubmit, setValue, getValues, watch } = useForm<FormValue>({
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      brand: 'visa',
      name: '',
    },
  });
  const [previewCard, setPreviewCard] = useState<CardShape>({
    id: null,
    brand: 'visa',
    last4: null,
    expMonth: null,
    expYear: null,
    name: '',
  });
  const watchFields = watch(['brand', 'name']);

  const registerOptions: Record<keyof FormValue, RegisterOptions> = {
    brand: {},
    name: {},
  };

  const onCreatedPaymentMethod2 = async (paymentMethod: PaymentMethod) => {
    const response = await charge(100, paymentMethod.id);
    if (response.actionRequired) {
      // We perform 3D Secure authentication
      const { paymentIntent, error } = await stripe.confirmCardPayment(response.clientSecret);
      if (error) {
        toast.error('Error in payment, please try again later');
      }
      if (paymentIntent.status === 'succeeded') {
        toast.success(`Payment successful`);

        return;
      }
      await checkPayment(paymentIntent.id);
      toast.success(`Payment successful`);
    } else {
      toast.success(`Payment successful`);
    }
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
    console.log(getValues());

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
          onCreatedPaymentMethod2(paymentMethod);
        });
    } catch (err) {}
  };
  const handleError = (errors: FieldErrorsImpl<FormValue>) => {
    console.log(errors);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setPreviewCard({
        ...previewCard,
        [name]: value[name],
      });
      // console.log(value, name, type)
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <>
      <form
        className={mergeClassNames('card border', styles['form'])}
        onSubmit={handleSubmit(handleFormValid, handleError)}
      >
        <div className={styles['card-preview']}>
          <CreditCard card={previewCard} />
        </div>
        <div className='row form-group'>
          <div className='col-12'>
            <label className='w-100'>
              <span>Card number *</span>
              <CardNumberElement
                className={mergeClassNames(styles['stripe-field-container'])}
                options={options}
                onChange={(event) => {
                  const brand = event.brand;
                  setValue('brand', brand && brand !== 'unknown' ? brand : 'visa');
                }}
                onBlur={() => {
                  //
                }}
                onFocus={() => {
                  //
                }}
              />
            </label>
          </div>
          <div className='col-12'>
            <label className='w-100'>
              <span>Expiration Date *</span>
              <CardExpiryElement
                className={mergeClassNames(styles['stripe-field-container'])}
                options={options}
                onChange={(event) => {
                  console.log('CardNumberElement [change]', event);
                }}
                onBlur={() => {
                  //
                }}
                onFocus={() => {
                  //
                }}
              />
            </label>
          </div>
          <div className='col-12'>
            <label className='w-100'>
              <span>CVC *</span>
              <CardCvcElement
                className={mergeClassNames(styles['stripe-field-container'])}
                options={options}
                onChange={(event) => {
                  console.log('CardNumberElement [change]', event);
                }}
                onBlur={() => {
                  //
                }}
                onFocus={() => {
                  //
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
