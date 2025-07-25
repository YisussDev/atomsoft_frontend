import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button-container',
  templateUrl: './button-container.component.html',
  styleUrls: ['./button-container.component.css']
})
export class ButtonContainerComponent {

  @Input() variant: "primary" | "secondary" | "outline" | "ghost" | "destructive" = "primary"
  @Input() size: "default" | "sm" | "lg" | "icon" = "default"
  @Input() disabled = false
  @Input() type: "button" | "submit" | "reset" = "button"
  @Input() className = ""

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>()

  get buttonClasses(): string {
    // Base classes
    let classes =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"

    // Add variant classes
    if (this.variant === "primary") {
      classes += " bg-button-primary text-primary-foreground hover:bg-button-primary focus-visible:ring-primary disabled:bg-transparent"
    } else if (this.variant === "secondary") {
      classes += " bg-button-secondary text-secondary-foreground hover:bg-button-secondary focus-visible:ring-secondary"
    } else if (this.variant === "outline") {
      classes +=
        " border border-input bg-button-outline hover:bg-button-outline hover:text-accent-foreground focus-visible:ring-accent"
    } else if (this.variant === "ghost") {
      classes += " hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent"
    } else if (this.variant === "destructive") {
      classes += " bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive"
    }

    // Add size classes
    if (this.size === "default") {
      classes += " h-10 px-4 py-3 rounded-md text-sm"
    } else if (this.size === "sm") {
      classes += " h-9 px-3 py-2 rounded-md text-xs"
    } else if (this.size === "lg") {
      classes += " h-11 px-8 py-6 rounded-md text-base"
    } else if (this.size === "icon") {
      classes += " h-10 w-10 rounded-md"
    }

    // Add disabled classes
    if (this.disabled) {
      classes += " pointer-events-none opacity-50"
    }

    // Add custom classes
    if (this.className) {
      classes += ` ${this.className}`
    }

    return classes
  }
}
