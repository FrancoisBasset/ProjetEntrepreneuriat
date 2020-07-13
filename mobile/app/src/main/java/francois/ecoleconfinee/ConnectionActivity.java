package francois.ecoleconfinee;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_connection);

        this.mailAddressInput = findViewById(R.id.mailAddressInput);
        this.passwordInput = findViewById(R.id.passwordInput);
    }

    public void connect(View view) throws JSONException {
        JSONObject body = new JSONObject();
        body.put("mail", this.mailAddressInput.getText());
        body.put("hash", Utils.hash(this.passwordInput.getText().toString()));

        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, "http://192.168.1.21/accounts/signin", body, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        StaticData.account = response.getJSONObject("response");

                        Intent intent = new Intent(getApplicationContext(), HomeActivity.class);
                        startActivity(intent);
                    } else {
                        System.out.println(response);
                    }
                } catch (JSONException e) {}
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                if (error.networkResponse.statusCode == 401) {
                    Toast.makeText(getApplicationContext(), "Identifiants incorrects", Toast.LENGTH_LONG).show();
                }
            }
        });

        queue.add(request);
    }

    @Override
    protected void onResume() {
        super.onResume();

        //this.mailAddressInput.setText("");
        //this.passwordInput.setText("");
    }
}