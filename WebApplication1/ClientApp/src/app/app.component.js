var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
export class Key {
    constructor(key) {
        this.key = key;
    }
}
export class Message {
    constructor(id, text, userid, user, themeid, theme) {
        this.id = id;
        this.text = text;
        this.userid = userid;
        this.user = user;
        this.themeid = themeid;
        this.theme = theme;
    }
}
export class Theme {
    constructor(id, subject) {
        this.id = id;
        this.subject = subject;
    }
}
export class User {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}
let AppComponent = class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.mask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.theme = new Theme();
        this.message = new Message();
        this.user = new User();
        this.captcha = new Key();
        this.errorMes = "123";
        this.erorohidden = true;
        this.keyValid = false;
        this.selector = false;
        this.image = 'data:image/png;base64,';
        this.formcheck = true;
    }
    ngOnInit() {
        this.loadThemes();
        this.dataService.getImage().subscribe(data => {
            this.image += data;
        }, error => console.log('Ошибка! Captcha!'));
    }
    loadThemes() {
        this.dataService.getThemes()
            .subscribe((data) => this.themes = data);
    }
    getMessage() {
        this.dataService.getMessage(this.message.userid, this.message.themeid, this.message.text);
    }
    getUser(name) {
        this.dataService.getUser()
            .subscribe(data => { this.user; });
    }
    addMessage() {
        this.message.user = this.user;
        this.message.userid = this.user.id;
        this.message.text = this.message.text;
        this.message.theme = this.theme;
        this.message.themeid = this.theme.id;
        console.log(this.message);
        this.dataService.createMessage(this.message)
            .subscribe((data) => this.message);
    }
    onChange(event) {
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
    onSubmit(value) {
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
                    .subscribe((data) => this.message);
                this.formcheck = false;
            }
        });
        if (this.keyValid == false) {
            this.erorohidden = false;
            this.errorMes = "Неправильный ключ";
        }
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app',
        templateUrl: './app.component.html',
        providers: [DataService],
        styleUrls: ['./app.css'],
        styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map