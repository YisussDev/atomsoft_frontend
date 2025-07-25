export interface AsideActivateInterface<T> {
  component: any;
  title: string;
  eventName: string;
  data: T;
  config?: AsideConfigurationInterface
}

export interface AsideConfigurationInterface {
  position: "left" | "right" | "top" | "bottom";
}
