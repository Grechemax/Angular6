import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  // constructor(private elementRef: ElementRef, private render: Renderer2) {} // мой подход длиннее и надо рендерер

  @HostListener('click') toggleDropdown(event: Event) {
    this.isOpen = !this.isOpen;
    // this.render.addClass(this.elementRef.nativeElement, 'open'); // мой подход длиннее и надо рендерер
  }
}
