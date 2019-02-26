import { NgFlashMessageService } from 'ng-flash-messages';
import { BehaviorSubject } from 'rxjs';

export class FlashUtil {
    private src = new BehaviorSubject({});

    constructor(private ngFlash: NgFlashMessageService) {
    }

    flash(message, type) {
        const flashMessage = {
            messages: [message],
            timeout: 2000,
            type: `${type} p-2 border-0 mb-0 rounded-0`,
            dismissible: false
        };
        this.ngFlash.showFlashMessage(flashMessage);
    }

}
