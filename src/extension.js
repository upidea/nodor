const vscode_1 = require("vscode");
require("date-format-lite");

//# const DEFAULT_FORMAT = 'YYYY-MM-DD hh:mm:ss';
const DEFAULT_FORMAT = 'YYYYMMDD';

function getConfiguredFormat(format = 'yesterday-format') {
    const insertDateStringConfiguration = vscode_1.workspace.getConfiguration('nodor');
    return insertDateStringConfiguration.get(format, DEFAULT_FORMAT);
}

function getFormattedDateString(userFormat = getConfiguredFormat()) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);    
    return yesterday.format(userFormat);
}

function replaceEditorSelection(text) {
    const editor = vscode_1.window.activeTextEditor;
    const selections = editor.selections;
    editor.edit((editBuilder) => {
        selections.forEach((selection) => {
            editBuilder.replace(selection, '');
            editBuilder.insert(selection.active, text);
        });
    });
}
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand('nodor.insertYesterday', () => replaceEditorSelection(getFormattedDateString())));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
