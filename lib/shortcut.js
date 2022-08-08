import { useRef, useLayoutEffect, useCallback, useEffect } from 'react';

const ShortCuts = (keys, callback, node) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    const handleKeypressed = useCallback((evento) => {
        if (keys[0] === evento.key && evento.ctrlKey === true) {
            doument.getElementById("buscar").focus;
        }
    }, [keys]);

    useEffect(() => {
        const targetNode = node ?? document;
        targetNode &&
            targetNode.addEventListener("keydown", handleKeypressed);
        return () =>
            targetNode &&
            targetNode.removeEventListener("keydown", handleKeypressed);
    }, [handleKeypressed, node]);
};

export default ShortCuts;