
interface FragmentLocation{
    target: HTMLElement,
    position?: InsertPosition
}

type Attribute =
    { id: string } |
    { class: string } |
    { name: string } |
    {[attribute: string]: string|number}
