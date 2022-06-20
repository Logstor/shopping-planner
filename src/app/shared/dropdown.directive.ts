import { Directive, HostBinding, HostListener, Input, OnInit } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit
{
    @HostBinding('class')
    currClass;
    private readonly closedClass: string = 'btn-group closed';
    private readonly openClass: string = 'btn-group open';

    constructor() {}

    ngOnInit(): void 
    {
        this.currClass = this.closedClass;   
    }

    @HostListener('click')
    onMouseClick() : void
    {
        if (this.currClass === this.closedClass) this.currClass = this.openClass;
        else this.currClass = this.closedClass;
    }
}