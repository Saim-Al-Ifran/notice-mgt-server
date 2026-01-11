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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeNoticeStatus = exports.fetchSingleNotice = exports.fetchAllNotices = exports.createNotice = void 0;
const Notice_1 = require("../models/Notice");
const customError_1 = __importDefault(require("../utils/errors/customError"));
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
/**
 * Get all notices
 */
const fetchAllNotices = (status_1, ...args_1) => __awaiter(void 0, [status_1, ...args_1], void 0, function* (status, page = 1, limit = 10) {
    const filter = {};
    if (status) {
        filter.status = status;
    }
    const skip = (page - 1) * limit;
    const [notices, total] = yield Promise.all([
        Notice_1.Notice.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Notice_1.Notice.countDocuments(filter),
    ]);
    return {
        notices,
        pagination: {
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            pageSize: limit,
        },
    };
});
exports.fetchAllNotices = fetchAllNotices;
/**
 * Get single notice
 */
const fetchSingleNotice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notice = yield Notice_1.Notice.findById(id);
    if (!notice) {
        throw new customError_1.default("Notice not found", 404);
    }
    return notice;
});
exports.fetchSingleNotice = fetchSingleNotice;
/**
 * Update notice status
 */
const changeNoticeStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (!["Draft", "Published"].includes(status)) {
        throw new customError_1.default("Invalid status value", 400);
    }
    const notice = yield Notice_1.Notice.findByIdAndUpdate(id, { status }, { new: true });
    if (!notice) {
        throw new customError_1.default("Notice not found", 404);
    }
    return notice;
});
exports.changeNoticeStatus = changeNoticeStatus;
