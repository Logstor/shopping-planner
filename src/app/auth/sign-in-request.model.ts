export class SignInRequest
{
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly returnSecureToken: boolean
    ) {}
}