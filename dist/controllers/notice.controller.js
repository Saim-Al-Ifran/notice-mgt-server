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
exports.saveNotice = void 0;
const notice_service_1 = require("../services/notice.service");
const TryCatch_1 = require("../middlewares/TryCatch");
exports.saveNotice = (0, TryCatch_1.TryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noticeData = req.body;
    const file = req.file;
    const savedNotice = yield (0, notice_service_1.createNotice)(noticeData, file);
    res.status(201).json({
        message: "Notice created successfully",
        data: savedNotice,
    });
}));
