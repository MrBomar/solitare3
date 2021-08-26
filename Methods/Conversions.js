const AlphaScale = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const CardSymbols = ["A",  2,  3,  4,  5,  6,  7,  8,  9, 10,"J","Q","K"];
const CardValues = ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
const SuiteScale = ["S","C","H","D","♠","♣","♥","♦"];
const OldValueScale = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D"];

const FromAlpha = (value) => AlphaScale.indexOf(value);

const ToAlpha = (value) => AlphaScale[value];

const FromFaceValue = (value) => CardValues[CardSymbols.indexOf(value)];

const ToFaceValue = (value) => CardSymbols[CardValues.indexOf(value)];

const ToSymbol = (value) => SuiteScale[SuiteScale.indexOf(value)+4];

const FromSymbol = (value) => SuiteScale[SuiteScale.indexOf(value)-4];

const SuiteValues = () => SuiteScale.slice(0,4);

const SuiteSymbols = () => SuiteScale.slice(4,8);

const InterpretID = (a) => `${ToSymbol(a.charAt(0)) + ToFaceValue(a.charAt(1))}`;

const OldToNew = (str) => {
    return String(str[0]).toUpperCase() + CardValues[OldValueScale.indexOf(str[1])];
};

const Conversion = {
    FromAlpha: FromAlpha,
    ToAlpha: ToAlpha,
    FromFaceValue: FromFaceValue,
    ToFaceValue: ToFaceValue,
    ToSymbol: ToSymbol,
    FromSymbol: FromSymbol,
    SuiteValues: SuiteValues,
    SuiteSymbols: SuiteSymbols,
    InterpretID: InterpretID,
    OldToNew: OldToNew
}

export default Conversion;

export {CardValues};