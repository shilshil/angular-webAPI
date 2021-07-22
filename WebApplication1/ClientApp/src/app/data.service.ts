import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Theme } from './theme';
import { User } from './user';
import { Message } from './message';
import { NgForm } from '@angular/forms';
import { Key } from './key';

@Injectable()
export class DataService {

    private url = "/api";

    constructor(private http: HttpClient) {
    }

    getThemes() {
        return this.http.get(this.url +"/messages");
    }

    getMessage(userid: number, themeid: number, text: string) {
        return this.http.get(this.url +'/messages');
    }

    getUser() {
        return this.http.get(this.url + '/users');
    }

    setCaptchaKey(captcha: Key) {
        return this.http.post(this.url + '/captcha', captcha);
        
    }

    getImage() {
        return this.http.get(this.url +'/captcha', { responseType: 'text' });
    }

    createMessage(message: Message) {
        return this.http.post(this.url +'/messages', message);
    }


}