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
exports.updateNoticeStatus = exports.getSingleNotice = exports.getAllNotices = exports.saveNotice = void 0;
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
/**
 * Get all notices
 * ?status=Published | Draft
 */
exports.getAllNotices = (0, TryCatch_1.TryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, page = "1", limit = "10" } = req.query;
    const result = yield (0, notice_service_1.fetchAllNotices)(status, Number(page), Number(limit));
    res.status(200).json({
        message: "Notices fetched successfully",
        data: result.notices,
        pagination: result.pagination,
    });
}));
/**
 * Get single notice
 */
exports.getSingleNotice = (0, TryCatch_1.TryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const notice = yield (0, notice_service_1.fetchSingleNotice)(id);
    res.status(200).json({
        message: "Notice fetched successfully",
        data: notice,
    });
}));
/**
 * Update notice status (publish / unpublish)
 */
exports.updateNoticeStatus = (0, TryCatch_1.TryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const updatedNotice = yield (0, notice_service_1.changeNoticeStatus)(id, status);
    res.status(200).json({
        message: "Notice status updated successfully",
        data: updatedNotice,
    });
}));
