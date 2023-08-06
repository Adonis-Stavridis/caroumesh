/** Get type from all optional props of T and set them as required, except the ignored keys*/
export type OptionalProps<T, K extends keyof T = never> = Required<Omit<Pick<T, OptionalKeys<T>>, AlwaysOptionalProps | K>>;
type OptionalKeys<T> = {
    [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? K : never;
}[keyof T];
/** Props that should be never be required (should never have default values) */
declare const ALWAYS_OPTIONAL_PROPS: readonly ["className"];
type AlwaysOptionalProps = (typeof ALWAYS_OPTIONAL_PROPS)[number];
export {};
