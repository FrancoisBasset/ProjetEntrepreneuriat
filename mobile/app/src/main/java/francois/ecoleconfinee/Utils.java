package francois.ecoleconfinee;

import android.widget.Toast;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Utils {
    private final static char[] hexArray = "0123456789abcdef".toCharArray();

    public static String hash(String text) {
        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] bs = digest.digest(text.getBytes(StandardCharsets.UTF_8));
            return new String(encodeHexString(bs));
        } catch (NoSuchAlgorithmException e) {}

        return "";
    }

    private static String encodeHexString(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        int v;
        for (int j = 0; j < bytes.length; j++) {
            v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }
}