import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { createRoot, Root as ReactRoot } from "react-dom/client";
import { createElement } from 'react';
import { ReactComponent } from "./reactComponent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @Input() value = "";
  @Output() valueChange = new EventEmitter<string>();
  root: ReactRoot | null = null;
  @ViewChild("reactPart") reactPart: ElementRef | null = null;

  ngAfterViewInit(): void {
    this.root = createRoot(this.reactPart?.nativeElement);
    this.renderReactComponent();

    this.valueChange.forEach(() => this.renderReactComponent());
  }
  ngOnDestroy(): void {
    this.root?.unmount();
  }

  onChange(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }

  renderReactComponent(): void {
    const elem = createElement(ReactComponent, {
      value: this.value,
      onChange: x => this.onChange(x),
    });
    this.root?.render(elem);
  }
}
