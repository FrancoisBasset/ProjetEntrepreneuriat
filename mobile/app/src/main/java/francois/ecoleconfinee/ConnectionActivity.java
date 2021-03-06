package francois.ecoleconfinee;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class ConnectionActivity extends AppCompatActivity {
    private EditText mailAddressInput;
    private EditText passwordInput;
    private TextView errorConnectionLabel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_connection);

        this.mailAddressInput = findViewById(R.id.mailAddressInput);
        this.passwordInput = findViewById(R.id.passwordInput);
        this.errorConnectionLabel = findViewById(R.id.errorConnectionLabel);
        this.errorConnectionLabel.setText("");
    }

    public void connect(View view) throws JSONException {
        JSONObject body = new JSONObject();
        body.put("mail", this.mailAddressInput.getText());
        body.put("hash", Utils.hash(this.passwordInput.getText().toString()));

        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, getString(R.string.api) + "/accounts/signin", body, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        StaticData.account = response.getJSONObject("response");

                        if (StaticData.account.getString("type").equals("client")) {
                            Intent intent = new Intent(getApplicationContext(), HomeActivity.class);
                            startActivity(intent);
                        } else {
                            wrongLogin("L'application est réservée uniquement aux clients");
                        }
                    }
                } catch (JSONException e) {}
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                if (error.networkResponse.statusCode == 401) {
                    wrongLogin("Identifiants incorrects !");
                }
            }
        });

        queue.add(request);
    }

    @Override
    protected void onResume() {
        super.onResume();

        this.errorConnectionLabel.setText("");
        this.mailAddressInput.setText("");
        this.passwordInput.setText("");
    }

    public void wrongLogin(String error) {
        this.errorConnectionLabel.setText(error);
    }
}