import { App, Modal, Setting } from "obsidian";

export class ConfirmModal extends Modal {
    existingFilename: string;
    onSubmit: (doOverwrite: boolean) => void;

    constructor(app: App, existingFilename: string, onSubmit: (result: boolean) => void) {
        super(app);
        this.existingFilename = existingFilename;
        this.onSubmit = onSubmit;
    }

    onOpen() {
        let { contentEl } = this;
        contentEl.setText(this.existingFilename + " already exists. Do you want to replace it?");

        new Setting(contentEl)
            .addButton((btn) =>
                btn
                    .setButtonText("Cancel")
                    .setCta()
                    .onClick(() => {
                        this.close();
                        this.onSubmit(false);
                    }));

        new Setting(contentEl)
            .addButton((btn) =>
                btn
                    .setButtonText("Replace")
                    .setCta()
                    .onClick(() => {
                        this.close();
                        this.onSubmit(true);
                    }));
    }
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }

}