import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { Core } from 'src/app/core/core.module';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})


export class SigninPage implements OnInit{
  user: User = new User();
  public formgroup: FormGroup;
  public email: AbstractControl;
  public senha: AbstractControl;
  public errorMensagens: any;

  constructor(public router: Router,
              public formBuilder: FormBuilder,
              private authService: AuthService,
              private network: Network,
              private core: Core,
              private loadingController: LoadingController){ 
  
  }


  ngOnInit(){

    this.errorMensagens = this.core.identForm;

    this.formgroup = this.formBuilder.group({
      email:['',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      senha:['',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]
    })

    this.networkConnect();

  }

  async networkConnect(){
    const loading = await this.loadingController.create({
      message: 'Conectando com a Internet...'
    })
    this.network.onDisconnect().subscribe(() => {
      loading.dismiss();
    });
  }

  createAccount(){
    this.router.navigate(['/cadastro']);
  }

  resetPassword(){
    this.router.navigate(['/resetpassword']);
  }

  signIn(){

      this.authService.signIn(this.user).then(() => {

        this.router.navigate(['menu/home']);

      })
      .catch((error: any) => {

        //IDENTIFICA O ERRO CORRESPONDENTE
        this.core.identificaError(error.code);

      })
  }

}
