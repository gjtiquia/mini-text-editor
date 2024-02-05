import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react';
import styles from './styles.module.css';
import { CodeInputProps } from '../types';
import { handleEnterKey, handleTabKey } from '../utils';

export function CodeInput(props: CodeInputProps) {

  const outerWrapperDivElement = useRef<HTMLDivElement>(null);
  const wrapperDivElement = useRef<HTMLDivElement>(null);
  const preElement = useRef<HTMLPreElement>(null);
  const textAreaElement = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    updateOuterWrapperDivBackgroundColor();
  }, []);

  useEffect(() => {

    // Commented because we want to stop the infinite resize loop
    // if (!textAreaElement.current)
    //   return;
    // new ResizeObserver(setElementSizes).observe(textAreaElement.current)

    setElementSizes();

    // Temporarily commented because it is quite annoying lol
    // Tho indeed should run this again when container size changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    generateCodeTokens();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.language]);

  function updateOuterWrapperDivBackgroundColor() {
    if (!outerWrapperDivElement.current || !preElement.current)
      return;

    const preElementBackgroundColor = window.getComputedStyle(preElement.current).backgroundColor;
    outerWrapperDivElement.current.style.backgroundColor = preElementBackgroundColor;
  }

  function setElementSizes() {

    if (!textAreaElement.current || !props.containerRef.current) return;
    if (!preElement.current || !wrapperDivElement.current || !outerWrapperDivElement.current) return;

    const { height, width } = getContainerSize();

    textAreaElement.current.style.width = `${width}px`;
    textAreaElement.current.style.height = `${height}px`;

    preElement.current.style.width = `${width}px`;
    preElement.current.style.height = `${height}px`;

    wrapperDivElement.current.style.width = `${width}px`;
    wrapperDivElement.current.style.height = `${height}px`;

    // (GJ): originally this function is called everytime textarea is resized. probably to show an extra line below
    // calculate what 1rem is in pixels
    // const rem = parseFloat(
    //   window.getComputedStyle(document.documentElement).fontSize
    // );
    // outerWrapperDivElement.current.style.width = `${width + rem}px`;
    // outerWrapperDivElement.current.style.height = `${height + rem}px`;

    outerWrapperDivElement.current.style.width = `${width}px`;
    outerWrapperDivElement.current.style.height = `${height}px`;
  }

  function getContainerSize() {
    if (!props.containerRef.current) {
      return { height: 0, width: 0 };
    }

    const { height, width } = props.containerRef.current.getBoundingClientRect();
    return { height, width };
  }

  function syncPreElementScrollWithTextAreaScroll() {
    if (preElement.current === null || textAreaElement.current === null) return;

    preElement.current.scrollTop = textAreaElement.current.scrollTop;
    preElement.current.scrollLeft = textAreaElement.current.scrollLeft;

    // Prevents a scrolling issue when the user manually resizes the wrapper
    if (textAreaElement.current.scrollTop > preElement.current.scrollTop) {
      textAreaElement.current.scrollTop = preElement.current.scrollTop;
    }

    // Prevents a scrolling issue when the user manually resizes the wrapper
    if (textAreaElement.current.scrollLeft > preElement.current.scrollLeft) {
      textAreaElement.current.scrollLeft = preElement.current.scrollLeft;
    }
  }

  const generateCodeTokens = () => {

    try {
      if (props.prismJS.languages[props.language]) {

        const tokens = props.prismJS.highlight(
          props.value,
          props.prismJS.languages[props.language],
          props.language
        );

        return tokens;
      } else {

        return props.prismJS.util.encode(props.value).toString();
      }

    } catch (e) {
      console.error(e);
    }
  };

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    let input_element = textAreaElement.current!;
    let code = input_element.value;
    if (event.key === 'Tab') {
      handleTabKey(event, input_element, code);
      props.onChange(input_element.value);
    }
    if (event.key === 'Enter') {
      handleEnterKey(event, input_element);
      props.onChange(input_element.value);
    }
  }

  async function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    props.onChange((e.target as HTMLTextAreaElement).value);
  }


  return (
    <div
      ref={outerWrapperDivElement}

      style={{
        // padding: '1rem', // FOUND THE UNWANTED PADDING
        boxSizing: `border-box`,
      }}

      className={styles['outer-wrapper']}
    >
      <div
        ref={wrapperDivElement}

        className={styles.wrap}
      >
        <textarea
          ref={textAreaElement}

          className="resize-none"
          spellCheck={false}

          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onScroll={syncPreElementScrollWithTextAreaScroll}

          // An attempt to replace the ResizeObserver
          // onResize={() => setElementSizes()}

          placeholder={props.placeholder}
          value={props.value}
        ></textarea>

        <pre
          ref={preElement!}
          className={`language-${props.language}`}
          aria-hidden={true}
        >
          <div
            dangerouslySetInnerHTML={{ __html: generateCodeTokens() || '' }}
            className="code-highlighted"
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeInput;
