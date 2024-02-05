import { CodeInput } from "./CodeInput";

import Prism from 'prismjs';
import('prismjs/components/prism-markdown')

// import "./themes/prism.css"
// import "./themes/prism-vsc-dark-plus.css"
import "./themes/prism-atom-dark.css"

export function SyntaxHighlightedView(props: { text: string; setText: (text: string) => void; }) {

    return (
        <div className="h-full w-full flex justify-center">
            <div className="h-full w-full">
                <CodeInput
                    onChange={props.setText}
                    value={props.text}
                    language={'markdown'}
                />
            </div>
        </div>
    );
}
