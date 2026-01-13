import {
    HttpResponse,
    ValidationErrorField,
  } from './contracts/HttpResponse.types';
  import { HttpResponseBuilder } from './HttpResponse';
  
  /**
   * Internal feature result types
   * (not part of public HTTP contract)
   */
  type FeatureSuccess<T> = {
    type: 'success';
    data: T;
  };
  
  type FeatureValidationError = {
    type: 'validation_error';
    fields: ValidationErrorField[];
  };
  
  type FeatureBusinessError = {
    type: 'business_error';
    code: string;
    message: string;
  };
  
  type FeatureResult<T> =
    | FeatureSuccess<T>
    | FeatureValidationError
    | FeatureBusinessError;
  
  /**
   * Feature handler contract
   */
  export type FeatureHandler<T> = () => Promise<FeatureResult<T>>;
  
  /**
   * Framework-agnostic HTTP result
   */
  export type HttpResult = {
    statusCode: number;
    body: HttpResponse;
  };
  
  /**
   * Generic HTTP controller
   */
  export class HttpController {
    static async handle<T>(
      handler: FeatureHandler<T>
    ): Promise<HttpResult> {
      try {
        const result = await handler();
  
        switch (result.type) {
          case 'success':
            return {
              statusCode: 200,
              body: HttpResponseBuilder.success(result.data),
            };
  
          case 'validation_error':
            return {
              statusCode: 400,
              body: HttpResponseBuilder.error(
                'VALIDATION_ERROR',
                'Invalid request data',
                result.fields
              ),
            };
  
          case 'business_error':
            return {
              statusCode: 409,
              body: HttpResponseBuilder.error(
                result.code,
                result.message
              ),
            };
        }
      } catch (error) {
        console.error('Unexpected error:', error);
  
        return {
          statusCode: 500,
          body: HttpResponseBuilder.error(
            'INTERNAL_ERROR',
            'An unexpected error occurred'
          ),
        };
      }
    }
  }
  