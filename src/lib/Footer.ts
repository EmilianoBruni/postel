class Footer {
    public recordCount = 0;

    result(): string {
        return `@E${this.recordCount}\n`;
    }
}

export default Footer;
