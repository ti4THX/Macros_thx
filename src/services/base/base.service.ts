import { Injectable } from '@nestjs/common';


@Injectable()
export class BaseService {

    get() {
        fetch('localhost:4444/', {
            method: 'GET',
        })
    }

}
