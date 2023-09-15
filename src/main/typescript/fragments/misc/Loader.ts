import {Fragment} from "../Fragment"

export class Loader extends Fragment{

    constructor() {
        super(`
        <div class="loader">
            <svg class="circular-loader" viewBox="25 25 50 50">
                <circle class="loader-path" cx="50" cy="50" r="20" fill="none">
                </circle>
            </svg>
        </div>`)
    }
}