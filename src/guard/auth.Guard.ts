import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from '../models/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService, private readonly user:UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest()
        
        const {authorization} = request.headers;

        try{ 
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1])

            
            // estou criando meu req.user para usar no decorator @User()
            request.user = await this.user.findUnique(data.id)

            return true 
            
            
        } catch(e){
            return false;
        }
        
    }

}