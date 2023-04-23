const express = require("express");
const passport = require("passport");
const router = express.Router();
const useragent = require("express-useragent");

const {
  addContextData,
  getAuthContextData,
  getTrustedAuthContextData,
  getUserPreferences,
  getBlockedAuthContextData,
  deleteContextAuthData,
  blockContextAuthData,
  unblockContextAuthData,
} = require("../controllers/authController");

const {
  verifyEmailValidation,
  verifyEmail,
} = require("../middlewares/users/verifyEmail");

const {
  verifyLoginValidation,
  verifyLogin,
  blockLogin,
} = require("../middlewares/users/verifyLogin");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/context-data/primary", requireAuth, getAuthContextData);
router.get("/context-data/trusted", requireAuth, getTrustedAuthContextData);
router.get("/context-data/blocked", requireAuth, getBlockedAuthContextData);
router.delete("/context-data/:contextId", requireAuth, deleteContextAuthData);
router.patch(
  "/context-data/block/:contextId",
  requireAuth,
  blockContextAuthData
);
router.patch(
  "/context-data/unblock/:contextId",
  requireAuth,
  unblockContextAuthData
);

router.get("/user-preferences", requireAuth, getUserPreferences);

router.use(useragent.express());
router.get("/verify", verifyEmailValidation, verifyEmail, addContextData);
router.get("/verify-login", verifyLoginValidation, verifyLogin);
router.get("/block-login", verifyLoginValidation, blockLogin);

module.exports = router;