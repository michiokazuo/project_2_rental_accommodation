/*
 Navicat Premium Data Transfer

 Source Server         : Local Host
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : project_2_rental_accommodation

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 27/04/2021 18:31:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `modify_date` datetime(0) NOT NULL,
  `create_date` datetime(0) NOT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `modify_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Trọ cho thuê', b'0', '2021-04-15 22:13:16', '2021-03-25 00:55:18', NULL, 'xuanphong10a@gmail.com');
INSERT INTO `category` VALUES (2, 'Nhà cho thuê', b'0', '2021-03-25 00:55:44', '2021-03-25 00:55:44', NULL, NULL);
INSERT INTO `category` VALUES (3, 'Trọ ghép', b'0', '2021-03-25 00:56:04', '2021-03-25 00:56:04', NULL, NULL);
INSERT INTO `category` VALUES (4, 'Chung cư mini', b'1', '2021-04-15 22:12:19', '2021-04-15 22:12:19', 'xuanphong10a@gmail.com', 'xuanphong10a@gmail.com');

-- ----------------------------
-- Table structure for convenient
-- ----------------------------
DROP TABLE IF EXISTS `convenient`;
CREATE TABLE `convenient`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `modify_date` datetime(0) NOT NULL,
  `create_date` datetime(0) NOT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `modify_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of convenient
-- ----------------------------
INSERT INTO `convenient` VALUES (1, 'Tủ lạnh', b'0', '2021-04-15 22:14:30', '2021-04-04 08:21:44', NULL, 'xuanphong10a@gmail.com');
INSERT INTO `convenient` VALUES (2, 'Máy giặt', b'0', '2021-04-04 08:22:10', '2021-04-04 08:22:10', 'xuanphong10a@gmail.com', 'xuanphong10a@gmail.com');
INSERT INTO `convenient` VALUES (3, 'Điều hòa', b'0', '2021-04-04 08:28:35', '2021-04-04 08:28:35', 'xuanphong10a@gmail.com', 'xuanphong10a@gmail.com');
INSERT INTO `convenient` VALUES (4, 'Nóng lạnh', b'0', '2021-04-04 08:35:35', '2021-04-04 08:35:35', 'xuanphong10a@gmail.com', 'xuanphong10a@gmail.com');
INSERT INTO `convenient` VALUES (5, 'Nhà vệ sinh riêng', b'0', '2021-04-04 08:37:07', '2021-04-04 08:37:07', 'xuanphong10a@gmail.com', 'xuanphong10a@gmail.com');
INSERT INTO `convenient` VALUES (6, 'Đồ dùng nhà bếp', b'0', '2021-04-04 08:37:58', '2021-04-04 08:37:58', 'xuanphong10a@gmail.com', 'xuanphong10a@gmail.com');
INSERT INTO `convenient` VALUES (7, 'Đồ dùng sinh hoạt cơ bản', b'0', '2021-04-04 08:38:49', '2021-04-04 08:38:49', 'xuanphong10a@gmail.com', 'xuanphong10a@gmail.com');
INSERT INTO `convenient` VALUES (8, 'Nhà để xe ', b'0', '2021-04-09 20:12:08', '2021-04-09 20:12:08', 'xuanphong10a@gmail.com', 'xuanphong10a@gmail.com');
INSERT INTO `convenient` VALUES (9, 'Gần chợ', b'0', '2021-04-15 22:14:14', '2021-04-15 22:14:14', 'xuanphong10a@gmail.com', 'xuanphong10a@gmail.com');

-- ----------------------------
-- Table structure for motel_room
-- ----------------------------
DROP TABLE IF EXISTS `motel_room`;
CREATE TABLE `motel_room`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id_host` int(0) NOT NULL COMMENT 'FK_HOST',
  `description` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `images` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `area` int(0) UNSIGNED NOT NULL COMMENT 'm2',
  `max_person` int(0) UNSIGNED NOT NULL DEFAULT 1,
  `price` int(0) UNSIGNED NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime(0) NOT NULL,
  `modify_date` datetime(0) NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `id_category` int(0) NOT NULL COMMENT 'FK_CATEGORY',
  `priority_object` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `modify_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `floors` int(0) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_room_category`(`id_category`) USING BTREE,
  INDEX `fk_room_host_create`(`id_host`) USING BTREE,
  CONSTRAINT `fk_room_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_room_host_create` FOREIGN KEY (`id_host`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of motel_room
-- ----------------------------
INSERT INTO `motel_room` VALUES (2, 'Phòng trọ gần BKX', 18, 'chủ thân thiện', './files/1617986284664/9pRAwF9 - Imgur.jpg<>./files/1617986284664/51611099_2251265894885743_7877683397751996416_n.png<>./files/1617986284664/52080707_406062693491370_8406400185491521536_n.png<>./files/1617986284664/52964900_349675459213783_1740305522680135680_n.png', 17, 1, 1400000, 'số 6A, ngách 106, ngõ gốc đề, hoàng văn thụ', '21.046951<>105.795069', '2021-04-09 23:39:22', '2021-04-12 00:36:09', b'1', 1, '1<>4<>7', 'quangdaica@gmail.com', 'quangdaica@gmail.com', 1);
INSERT INTO `motel_room` VALUES (3, 'Phòng trọ ghép gần BKX', 18, 'không gian thoáng, trong lành, gần các khu cần thiết', './files/1617991144563/j.jpg<>./files/1617991144563/m.jpg<>./files/1617991144563/Thiên Tằm.png<>./files/1617991144563/thumb-1920-755567.png', 20, 4, 2100000, '84 ngõ thống nhất, đại la, hai bà trưng, hà nội', '21.0245<>105.84117', '2021-04-10 00:59:05', '2021-04-10 09:18:58', b'1', 3, '1<>4<>7', 'quangdaica@gmail.com', 'quangdaica@gmail.com', 1);
INSERT INTO `motel_room` VALUES (4, 'Nhà trọ gần Hanu', 18, 'sử dụng toàn bộ nội thất trong nhà', './files/1618020990893/9pRAwF9 - Imgur.jpg<>./files/1618020990893/52964900_349675459213783_1740305522680135680_n.png<>./files/1618020990893/61834747_681893102240801_2578197184784629760_n.jpg<>./files/1618020990893/65013143_1204203996406041_1198318587371061248_n.jpg', 30, 1, 10000000, 'Nguyễn Trãi, Thanh Xuân Bắc, Nam Từ Liêm, Hà Nội', '21.0245<>105.84117', '2021-04-10 09:16:31', '2021-04-12 00:18:58', b'0', 2, '1<>4<>5<>7', 'quangdaica@gmail.com', 'quangdaica@gmail.com', 4);
INSERT INTO `motel_room` VALUES (5, 'Nhà cho thuê nguyên căn tại Hoàng mai', 18, 'chính chủ, phù hợp cho cửa hàng', './files/1618071172561/9pRAwF9 - Imgur.jpg<>./files/1618071172561/51611099_2251265894885743_7877683397751996416_n.png<>./files/1618071172561/52080707_406062693491370_8406400185491521536_n.png<>./files/1618071172561/52964900_349675459213783_1740305522680135680_n.png', 30, 6, 20000000, 'ngách 106, ngõ gốc đề', '21.046951<>105.795069', '2021-04-10 23:12:53', '2021-04-11 22:13:19', b'0', 2, '1<>5<>8', 'quangdaica@gmail.com', 'quangdaica@gmail.com', 2);
INSERT INTO `motel_room` VALUES (6, 'Trọ ghép cho sinh viên nam BKX', 18, 'không chung chủ', './files/1618154098408/9pRAwF9 - Imgur.jpg<>./files/1618154098408/51611099_2251265894885743_7877683397751996416_n.png<>./files/image_config/rental.svg<>./files/image_config/rental.svg', 25, 3, 2000000, '21 lê thanh nghị', '20.99298488603517<>105.85358517455673', '2021-04-11 22:14:58', '2021-04-11 22:25:17', b'0', 3, '1<>5<>7', 'quangdaica@gmail.com', 'quangdaica@gmail.com', 1);
INSERT INTO `motel_room` VALUES (7, 'Trọ đơn cho nữ sinh viên gần BKX', 18, 'an ninh tốt', './files/1618158674814/52080707_406062693491370_8406400185491521536_n.png<>./files/1618158674814/52964900_349675459213783_1740305522680135680_n.png<>./files/1618158674814/61834747_681893102240801_2578197184784629760_n.jpg<>./files/1618158674814/65013143_1204203996406041_1198318587371061248_n.jpg', 16, 1, 1000000, '120 Đại la', '20.992977711238602<>105.85355771401116', '2021-04-11 23:31:15', '2021-04-11 23:31:15', b'0', 1, '2<>4<>7', 'quangdaica@gmail.com', 'quangdaica@gmail.com', 1);
INSERT INTO `motel_room` VALUES (8, 'Trọ đơn cho người đi làm', 18, 'an ninh tot', './files/1618158887510/52964900_349675459213783_1740305522680135680_n.png<>./files/1618158887510/61834747_681893102240801_2578197184784629760_n.jpg<>./files/1618158887510/65013143_1204203996406041_1198318587371061248_n.jpg<>./files/1618158887510/a.jpg', 20, 1, 1500000, 'ngách 106, ngõ gốc đề', '20.992897280244954<>105.85359526114847', '2021-04-11 23:34:48', '2021-04-11 23:34:48', b'0', 1, '5<>7', 'quangdaica@gmail.com', 'quangdaica@gmail.com', 1);
INSERT INTO `motel_room` VALUES (9, 'Phòng trọ cho gia đình', 18, 'an ninh tốt, gần các khu mua sắm đồ dùng sinh hoạt', './files/1618233818335/52964900_349675459213783_1740305522680135680_n.png<>./files/1618233818335/61834747_681893102240801_2578197184784629760_n.jpg<>./files/1618233818335/d.jpg<>./files/1618233818335/Đại thiên thế giới.jpg', 30, 1, 2000000, '12 Tạ Quang Bửu', '21.004476<>105.844174', '2021-04-12 20:23:39', '2021-04-12 20:23:39', b'0', 1, '5<>8', 'quangdaica@gmail.com', 'quangdaica@gmail.com', 1);

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report`  (
  `id_cmt` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_user` int(0) NOT NULL COMMENT 'FK_USER',
  `id_room` int(0) NOT NULL COMMENT 'FK_ROOM',
  `rate` int(0) UNSIGNED NOT NULL,
  `comment` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `modify_date` datetime(0) NOT NULL,
  `create_date` datetime(0) NOT NULL,
  `modify_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_cmt`) USING BTREE,
  INDEX `fk_room_report`(`id_room`) USING BTREE,
  INDEX `fk_user_report`(`id_user`) USING BTREE,
  CONSTRAINT `fk_room_report` FOREIGN KEY (`id_room`) REFERENCES `motel_room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_report` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of report
-- ----------------------------
INSERT INTO `report` VALUES (1, 16, 4, 5, 'cho e xin review với ạ!!!', b'0', '2021-04-27 18:28:11', '2021-04-10 15:56:24', 'anhphonghktm@gmail.com', NULL);
INSERT INTO `report` VALUES (2, 16, 4, 5, 'e cám ơn ạ!!!', b'0', '2021-04-10 16:23:58', '2021-04-10 16:23:58', 'anhphonghktm@gmail.com', 'anhphonghktm@gmail.com');
INSERT INTO `report` VALUES (3, 16, 6, 5, 'idolvodich', b'1', '2021-04-27 16:57:19', '2021-04-27 16:57:19', 'anhphonghktm@gmail.com', 'anhphonghktm@gmail.com');
INSERT INTO `report` VALUES (4, 16, 6, 5, 'idol vo dich', b'0', '2021-04-27 16:58:13', '2021-04-27 16:57:30', 'anhphonghktm@gmail.com', NULL);
INSERT INTO `report` VALUES (5, 16, 4, 5, '123', b'0', '2021-04-27 18:28:18', '2021-04-27 18:28:18', 'anhphonghktm@gmail.com', 'anhphonghktm@gmail.com');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'ROLE_RENTER', 'Người thuê');
INSERT INTO `role` VALUES (2, 'ROLE_HOST', 'Chủ thuê');
INSERT INTO `role` VALUES (3, 'ROLE_ADMIN', 'Quản lý');

-- ----------------------------
-- Table structure for room_has_convenient
-- ----------------------------
DROP TABLE IF EXISTS `room_has_convenient`;
CREATE TABLE `room_has_convenient`  (
  `id_room` int(0) NOT NULL COMMENT 'FK_ROOM',
  `id_convenient` int(0) NOT NULL COMMENT 'FK_CONVENTIENT',
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `modify_date` datetime(0) NOT NULL,
  `create_date` datetime(0) NOT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `modify_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_room`, `id_convenient`) USING BTREE,
  INDEX `fk_convenient`(`id_convenient`) USING BTREE,
  CONSTRAINT `fk_convenient` FOREIGN KEY (`id_convenient`) REFERENCES `convenient` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_room` FOREIGN KEY (`id_room`) REFERENCES `motel_room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room_has_convenient
-- ----------------------------
INSERT INTO `room_has_convenient` VALUES (2, 3, b'1', '2021-04-11 23:29:31', '2021-04-11 23:29:31', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (2, 4, b'1', '2021-04-11 23:36:28', '2021-04-11 23:36:28', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (2, 5, b'1', '2021-04-11 23:36:28', '2021-04-11 23:36:28', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (2, 6, b'1', '2021-04-11 23:36:28', '2021-04-11 23:36:28', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (2, 7, b'1', '2021-04-10 22:44:30', '2021-04-09 23:39:22', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (2, 8, b'1', '2021-04-11 23:36:28', '2021-04-11 23:36:28', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (3, 2, b'1', '2021-04-10 00:59:05', '2021-04-10 00:59:05', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (3, 5, b'1', '2021-04-10 00:59:05', '2021-04-10 00:59:05', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (3, 8, b'1', '2021-04-10 00:59:05', '2021-04-10 00:59:05', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (4, 1, b'0', '2021-04-12 00:18:58', '2021-04-12 00:18:58', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (4, 2, b'1', '2021-04-11 23:36:59', '2021-04-11 23:36:59', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (4, 3, b'0', '2021-04-11 23:36:59', '2021-04-11 23:36:59', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (4, 4, b'1', '2021-04-12 00:18:58', '2021-04-12 00:18:58', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (4, 5, b'0', '2021-04-12 00:18:58', '2021-04-12 00:18:58', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (4, 6, b'1', '2021-04-12 00:07:23', '2021-04-12 00:07:23', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (4, 8, b'0', '2021-04-12 00:18:58', '2021-04-12 00:18:58', NULL, 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (5, 1, b'0', '2021-04-11 22:13:19', '2021-04-10 23:12:53', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (5, 2, b'0', '2021-04-11 22:13:19', '2021-04-10 23:12:53', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (5, 3, b'0', '2021-04-11 22:13:19', '2021-04-10 23:12:53', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (5, 4, b'0', '2021-04-11 22:13:19', '2021-04-10 23:12:53', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (5, 5, b'0', '2021-04-11 22:13:19', '2021-04-10 23:12:53', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (5, 6, b'0', '2021-04-11 22:13:19', '2021-04-10 23:12:53', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (5, 7, b'0', '2021-04-11 22:13:19', '2021-04-10 23:12:53', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (5, 8, b'0', '2021-04-11 22:13:19', '2021-04-10 23:12:53', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (6, 2, b'0', '2021-04-11 22:14:58', '2021-04-11 22:14:58', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (6, 3, b'0', '2021-04-11 22:25:17', '2021-04-11 22:25:17', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (6, 4, b'0', '2021-04-11 22:25:17', '2021-04-11 22:14:58', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (6, 5, b'0', '2021-04-11 22:25:17', '2021-04-11 22:14:58', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (6, 8, b'0', '2021-04-11 22:25:17', '2021-04-11 22:14:59', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (7, 4, b'0', '2021-04-11 23:31:15', '2021-04-11 23:31:15', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (7, 5, b'0', '2021-04-11 23:31:15', '2021-04-11 23:31:15', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (7, 6, b'0', '2021-04-11 23:31:15', '2021-04-11 23:31:15', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (8, 1, b'0', '2021-04-11 23:34:48', '2021-04-11 23:34:48', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (8, 5, b'0', '2021-04-11 23:34:48', '2021-04-11 23:34:48', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (8, 6, b'0', '2021-04-11 23:34:48', '2021-04-11 23:34:48', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (9, 2, b'0', '2021-04-12 20:23:39', '2021-04-12 20:23:39', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (9, 3, b'0', '2021-04-12 20:23:39', '2021-04-12 20:23:39', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (9, 5, b'0', '2021-04-12 20:23:39', '2021-04-12 20:23:39', 'quangdaica@gmail.com', 'quangdaica@gmail.com');
INSERT INTO `room_has_convenient` VALUES (9, 6, b'0', '2021-04-12 20:23:39', '2021-04-12 20:23:39', 'quangdaica@gmail.com', 'quangdaica@gmail.com');

-- ----------------------------
-- Table structure for tenant
-- ----------------------------
DROP TABLE IF EXISTS `tenant`;
CREATE TABLE `tenant`  (
  `id_user` int(0) NOT NULL COMMENT 'FK_USER',
  `id_room` int(0) NOT NULL COMMENT 'FK_ROOM',
  `create_date` datetime(0) NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `status` bit(1) NOT NULL COMMENT 'sign to rent',
  `modify_date` datetime(0) NOT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `modify_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`, `id_room`) USING BTREE,
  INDEX `fk_room_rent`(`id_room`) USING BTREE,
  CONSTRAINT `fk_room_rent` FOREIGN KEY (`id_room`) REFERENCES `motel_room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_rent` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tenant
-- ----------------------------
INSERT INTO `tenant` VALUES (16, 4, '2021-04-10 15:42:37', b'0', b'1', '2021-04-15 21:53:10', 'anhphonghktm@gmail.com', 'xuanphong10a@gmail.com');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `role` int(0) NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `job` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `workplace` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `modify_date` datetime(0) NOT NULL,
  `create_date` datetime(0) NOT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `modify_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `home_town` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_role`(`role`) USING BTREE,
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (16, 'anhphonghktm@gmail.com', '$2a$10$oA6X9MBY5SvpEwxzugMkxOiXONoF9Hz0Ej8VMKAQqOBVVe83OmJuS', 'DONG PHONG', '0346902567', 1, './files/1617530409248/thumb-1920-801211.jpg', b'0', '1', '2', '0', 'HUST', '1997-01-04', '2021-04-09 18:41:42', '2021-04-04 17:00:10', 'anonymousUser', 'anhphonghktm@gmail.com', 'Hải Dương');
INSERT INTO `user` VALUES (17, 'xuanphong10a@gmail.com', '$2a$10$/nSsdGxx9fCOFIGHS6d3V.M4E.vhPrzR0oIsmI1a4duGQ.hAQ7ndC', 'Đồng Xuân Phong', '0346902568', 3, './files/1618488655701/avatar-user.png', b'0', '2', '0', '0', 'HUST', '2000-10-02', '2021-04-15 19:11:53', '2021-04-04 17:03:02', NULL, 'xuanphong10a@gmail.com', 'Hải Dương');
INSERT INTO `user` VALUES (18, 'quangdaica@gmail.com', '$2a$10$nvxnNozcwEacmBAIs2mbtuBDNk90FBvlBAcX0IoybZeI4QfK..u6u', 'Trần Minh Quang', '0987654233', 2, './files/1618073016170/52964900_349675459213783_1740305522680135680_n.png', b'0', '1', '1', '0', 'Cty Huy Hoang chi nhanh HN', '1991-09-10', '2021-04-10 23:43:37', '2021-04-09 00:09:11', 'anonymousUser', 'quangdaica@gmail.com', 'Hải Phòng');
INSERT INTO `user` VALUES (19, 'nguyen@gmail.com', '$2a$10$VQKw.krtGRY267NyGpmGpesRBQyEq5AObRibaVrsMBMdQqk.Z6bGS', 'Phạm Anh Nguyên', '0323423523', 1, './files/1617981397087/g.png', b'0', '2', '1', '0', 'HUST', '1999-07-09', '2021-04-09 22:16:37', '2021-04-09 22:16:37', 'anonymousUser', 'anonymousUser', 'Hoa Binh');
INSERT INTO `user` VALUES (20, 'superman@gmail.com', '$2a$10$TqrJU7Ncb/Zq5lGrGOHLWepozzOIl2P2mm37UDw6aW8oQq9R6.WLm', 'Nguyễn Thanh Tú', '0389701234', 1, './files/1618109868505/52080707_406062693491370_8406400185491521536_n.png', b'0', '1', '1', '0', 'Vngroup', '1997-09-11', '2021-04-11 09:57:49', '2021-04-11 09:57:49', 'anonymousUser', 'anonymousUser', 'HB');
INSERT INTO `user` VALUES (21, 'khanh@gmail.com', '$2a$10$/WENCuZ1OEuOvDfOwjdIO.wgYigavrF1AiZo5KHjoolS2nFWVb/UK', 'Khánh', '0978598111', 1, './files/1618111739474/9pRAwF9 - Imgur.jpg', b'0', '2', '1', '0', 'HUST', '2000-06-07', '2021-04-11 10:29:03', '2021-04-11 10:29:03', 'anonymousUser', 'anonymousUser', 'TB');
INSERT INTO `user` VALUES (22, 'khanh123@gmail.com', '$2a$10$I2OckUiV8SIoRA/gzuzVe.uLzJJiuoDDivMUCcgOAvRxRG81q8Q02', 'khanh123', '0982111111', 1, './files/1618112575109/61834747_681893102240801_2578197184784629760_n.jpg', b'1', '2', '1', '0', 'Vbee', '2000-06-15', '2021-04-11 10:42:56', '2021-04-11 10:42:56', 'anonymousUser', 'anonymousUser', 'HN');
INSERT INTO `user` VALUES (23, 'tuanxl@gmail.com', '$2a$10$un/Uj8gI5DAzjD/n.dFkaeMnZTHh6oNQ/hWhyBU5CzF3fpPCbaR3C', 'Nguyễn Minh Tuấn', '0564099371', 1, './files/1618239818187/j.jpg', b'0', '1', '1', '0', 'FLC', '1998-02-12', '2021-04-12 22:03:39', '2021-04-12 20:14:15', 'anonymousUser', 'tuanxl@gmail.com', 'Thanh Hóa');
INSERT INTO `user` VALUES (24, 'quangcuto@gmail.com', '$2a$10$8ZSHoYHvu6yKLuV6Ly4Sv.J4j.c9jVXmn.w2ILtTyxZdYeVdAxlgm', 'Phạm Văn Quân', '0398210034', 1, './files/image_config/avatar-user.png', b'0', '2', '1', '0', 'HUST', '2000-05-23', '2021-04-23 21:16:27', '2021-04-23 21:11:51', 'anonymousUser', 'anonymousUser', 'HD');

SET FOREIGN_KEY_CHECKS = 1;
