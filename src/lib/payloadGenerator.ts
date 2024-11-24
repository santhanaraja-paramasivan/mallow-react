
export class PayloadGenerator {
  loginRequest(email: string, password: string) {
    return {
      email: email,
      password: password,
    };
  }
}