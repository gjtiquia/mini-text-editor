import { useRef } from "react";
import { CodeInput } from "./CodeInput";

import Prism from 'prismjs';
import('prismjs/components/prism-markdown')
// import "./themes/prism.css"
// import "./themes/prism-vsc-dark-plus.css"
// import "./themes/prism-atom-dark.css"

export function SyntaxHighlightedView(props: { text: string; setText: (text: string) => void; }) {

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="h-full w-full flex justify-center">
            <div className="h-full w-full bg-blue-500" ref={containerRef}>
                <CodeInput
                    autoHeight
                    // placeholder="Input your code here..."
                    prismJS={Prism}
                    onChange={props.setText}
                    value={props.text}
                    language={'markdown'}

                    containerRef={containerRef} />
            </div>
        </div>
    );
}
