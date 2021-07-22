import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { DataService } from './data.service';


export class Key {
    constructor(
        public key?: string,
    ) { }
}

export class Message {
    constructor(
        public id?: number,
        public text?: string,
        public userid?: number,
        public user?: object,
        public themeid?: number,
        public theme?: object
    ) { }
}

export class Theme {
    constructor(
        public id?: number,
        public subject?: string,
    ) { }
}

export class User {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public phone?: string,
    ) { }
}

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService],
    styleUrls: ['./app.css'],
    styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
})
export class AppComponent implements OnInit {

    mask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    theme: Theme = new Theme();
    message: Message = new Message();
    user: User = new User();
    users: User[];
    messages: Message[];
    themes: Theme[];
    captcha: Key = new Key();
    newVal;
    errorMes:string="123";
    key;
    erorohidden: boolean = true;
    keyValid: boolean = false;
    selector: boolean = false;
    image: string = 'data:image/png;base64,';

    formcheck = true;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadThemes();
        
        this.dataService.getImage().subscribe(data => {
            this.image += data;
        }, error => console.log('Ошибка! Captcha!'));

    }

    loadThemes() {
        this.dataService.getThemes()
            .subscribe((data: Theme[]) => this.themes = data);
    }

    getMessage() {
        this.dataService.getMessage(this.message.userid, this.message.themeid, this.message.text);
    }

    getUser(name:string) {
        this.dataService.getUser()
            .subscribe(data => { this.user });
    }

    addMessage() {
        this.message.user = this.user;
        this.message.userid = this.user.id;
        this.message.text = this.message.text;
        this.message.theme = this.theme;
        this.message.themeid = this.theme.id;
        console.log(this.message);
        this.dataService.createMessage(this.message)
            .subscribe((data: Message) => this.message);
    }

    onChange(event): void { 
        this.newVal = event.target.value;
        this.selector = true;
    }

    reCaptcha() {
        this.image = 'data:image/png;base64,';
        this.dataService.getImage().subscribe(data => {
            this.image += data;
        }, error => console.log(error));
    }

    reload() {
        window.location.reload();
    }
    onSubmit(value: any) {


        this.user.name = value.name;
        this.user.email = value.email;
        this.user.phone = value.phone;
        this.theme.subject = this.newVal;

        this.message.theme = this.theme;
        this.message.user = this.user;

        this.message.text = value.text;
        this.captcha.key = value.key;

        this.dataService.setCaptchaKey(this.captcha)
            .subscribe(data => {
                this.keyValid = true;
                if (this.keyValid) {
                    this.dataService.createMessage(this.message)
                        .subscribe((data: Message) => this.message);
                    this.formcheck = false;
                }
            });
        if (this.keyValid == false) {
            this.erorohidden = false;
            this.errorMes = "Неправильный ключ";
        }
        }    
}