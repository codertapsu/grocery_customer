export interface PaymentIntentResponse {
  message: string;
  actionRequired?: boolean;
  clientSecret?: string;
  id: string;
}
