import { AfterViewInit, Component, ContentChild, Input, OnDestroy } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MessagesErrorInput } from './models/messages-error.const';

@Component({
  selector: 'ua-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnDestroy, AfterViewInit {

  @Input() validators: string[] = [];

  @Input() messageToValidators: [];

  @Input() classContainer: string;

  @Input() classMessage: string;

  @Input() close = false;

  @Input() targetLabel: string;

  @Input() idInput: string;

  @ContentChild(FormControlName)
  private input: FormControlName;

  private inputRef: HTMLElement;
  private labelRef: HTMLElement;
  private subscriptions: Subscription[] = [];

  message: string;

  constructor() { }


  ngAfterViewInit(): void {
    if (this.input === undefined) {
      throw new Error('<app-input-container> precisa ser utlizado com uma diretiva formControlName');
    }
    this.loadElements();
    this.subscribers();
  }


  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  private loadElements(): any {
    this.inputRef = this.getInput();

    if (this.inputRef) {
      this.labelRef = this.getLabel();
    }
  }

  private getInput(): HTMLElement {
    const inputSelector = this.idInput ? `*[id=${this.idInput}]` : `*[formControlName=${this.input.name}]`;
    return document.querySelector(inputSelector);
  }

  private getLabel(): HTMLElement {
    const labelSelector = `*[for=${this.targetLabel ? this.targetLabel : this.inputRef.id}]`;
    return document.querySelector(labelSelector);
  }

  private subscribers() {
    this.subscriptions.push(
      this.input.statusChanges
        .pipe(
          debounceTime(500)
        )
        .subscribe(() => {
          this.setMessage();
          this.setState();
        })
    )
  }

  private setMessage(): void {
    this.message = null;
    if (this.isInvalid()) {
      const validator = Object.keys(this.input.errors)[0];
      this.message = this.setMessageByValidator(validator);
    }
  }

  private isInvalid(): boolean {
    if (this.input.errors != null) {
      const validator = Object.keys(this.input.errors)[0];
      if (this.validators.length > 0) {
        return this.validators.includes(validator);
      } else {
        return this.input.invalid;
      }
    }
    return false;
  }

  private setState(): any {
    const isInvalid = this.isInvalid();
    if (isInvalid) {
      this.addClass(this.inputRef, 'invalid');
      this.addClass(this.labelRef, 'error');
    } else {
      this.removeClass(this.inputRef, 'invalid');
      this.removeClass(this.labelRef, 'error');
    }
    (this.inputRef as any).wrong = isInvalid;
  }

  private setMessageByValidator(validatorName: string): string {
    if (this.messageToValidators != null) {
      return this.getCustomMessage(validatorName);
    }
    return this.getDefaultMessage(validatorName);
  }

  private getCustomMessage(validatorName: string): any {
    try {
      const msg = this.messageToValidators.find(key => {
        return (key[validatorName]);
      })[validatorName];
      if (msg != null) {
        return msg;
      }
    } catch (error) {
      return this.getDefaultMessage(validatorName);
    }
  }

  private getDefaultMessage(validatorName: string): string {
    const msg = MessagesErrorInput[validatorName];
    if (msg != null) {
      switch (validatorName) {
        case 'minlength':
          return msg.replace('{VALUE}', (this.input.errors.minlength.requiredLength || 'NOT_CONTENT'));
        case 'maxlength':
          return msg.replace('{VALUE}', (this.input.errors.maxlength.requiredLength || 'NOT_CONTENT'));
        default:
          return msg;
      }
    }
  }

  private addClass(element, classStr: string) {
    if (element != null && !element.classList.contains(classStr)) {
      element.classList.add(classStr);
    }
  }

  private removeClass(element, classStr: string) {
    if (element != null) {
      element.classList.remove(classStr);
    }
  }

}
