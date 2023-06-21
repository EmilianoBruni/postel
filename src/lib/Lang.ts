class Lang {
    static EOL = '\r\n';

    static newLine = (jumpLineCount: number) => {
        return 'SPA ' + jumpLineCount.toString();
    };
}

export default Lang;
