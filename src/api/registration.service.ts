import {API_BASE_URL} from '@/config';
import {HttpService} from '@/lib/httpService';
import {getAuthHeaders} from './data.service';

class RegistrationService {
  httpService = new HttpService(API_BASE_URL);

  async login(body: {email: string; password: string}) {
    const {request} = this.httpService.post<{token: string}>(
      '/signin',
      body,
      {}
    );
    return await request;
  }

  async register(body: {email: string; password: string; name: string}) {
    const {request} = this.httpService.post<{token: string}>(
      '/signup',
      body
    );
    return await request;
  }

  async sendVerificationEmail() {
    const {request} = this.httpService.post(
      '/sendEmailForVerification',
      {},
      {...getAuthHeaders()}
    );
    return await request;
  }

  async validateEmailOTP(body: {otp: string}) {
    const {request} = this.httpService.post<{token: string}>(
      '/verifyEmailVerificationOTP',
      body,
      {...getAuthHeaders()}
    );
    return await request;
  }
}

export const registrationService = new RegistrationService();
