"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotice = void 0;
const Notice_1 = require("../models/Notice");
const fileUpload_1 = require("../utils/fileUpload");
/**
 * Create notice
 */
const createNotice = (noticeData, file) => __awaiter(void 0, void 0, void 0, function* () {
    let attachmentUrl;
    if (file) {
        const result = yield (0, fileUpload_1.uploadFileToCloudinary)({
            originalname: file.originalname,
            buffer: file.buffer,
            mimetype: file.mimetype,
        });
        attachmentUrl = result.secure_url;
    }
    const notice = new Notice_1.Notice(Object.assign(Object.assign({}, noticeData), { attachmentUrl }));
    return yield notice.save();
});
exports.createNotice = createNotice;
