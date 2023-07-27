import { PostelRowConstructor } from '../types';
import PostelRow from './Syntax/PostelRow';

class Lang {
    static EOL = '\r\n';

    static newLine = (jumpLineCount: number) => {
        if (jumpLineCount === 0) return '';
        return 'SPA ' + jumpLineCount.toString();
    };

    static PostelRow = (opt: PostelRowConstructor): PostelRow => {
        return new PostelRow(opt);
    };
}

export default Lang;
