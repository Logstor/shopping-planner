import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective
{
    @HostBinding('class.open')
    isOpen: boolean = false;

    constructor(private elementRef: ElementRef) {}

    @HostListener('document:click', ['$event'])
    onMouseClick(event: Event) : void
    {
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
}