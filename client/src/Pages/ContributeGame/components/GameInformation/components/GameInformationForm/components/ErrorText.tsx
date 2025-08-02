import { useEffect, useRef } from "react";

type ErrorTextProps = {
    error : string;
}

function ErrorText({error} : ErrorTextProps) {
    const paragraphRef = useRef<HTMLParagraphElement | null>(null)

    function scrollToTop() {
        const parent = paragraphRef.current?.closest("div");
        parent?.scrollIntoView({
            behavior : "smooth",
        });
    }

    useEffect(() => {
        scrollToTop();
    }, [error]);

  return (
    <p ref={paragraphRef} className="form-error">{error}</p>
  )
}

export default ErrorText