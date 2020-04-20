import { Directive, Input, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string= 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit() {
    this.backgroundColor= this.defaultColor;
  }
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }

}
