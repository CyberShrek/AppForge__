
interface FragmentLocation{
    // @ts-ignore
    target: HTMLElement|Fragment,
    position?: InsertPosition
}

type Attribute  =
    { id: string } |
    { class: string } |
    { name: string } |
    {[attribute: string]: string|number}
