package francois.ecoleconfinee;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class ModifyPasswordActivity extends AppCompatActivity {
    private EditText oldPasswordInput;
    private EditText password1Input;
    private EditText password2Input;
    private TextView errorModifyPasswordLabel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_modify_password);

        this.oldPasswordInput = findViewById(R.id.oldPasswordInput);
        this.password1Input = findViewById(R.id.password1Input);
        this.password2Input = findViewById(R.id.password2Input);
        this.errorModifyPasswordLabel = findViewById(R.id.errorModifyPasswordLabel);
        this.errorModifyPasswordLabel.setText("");
    }

    public void applyNewPassword(View view) {
        if (this.password1Input.getText().toString().equals(this.password2Input.getText().toString()) == false) {
            showError("Les nouveaux mots de passe ne sont pas égaux");
            return;
        }

        JSONObject body = new JSONObject();
        try {
            body.put("oldPassword", Utils.hash(this.oldPasswordInput.getText().toString()));
            body.put("newPassword", Utils.hash(this.password1Input.getText().toString()));
        } catch (JSONException e) {}

        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.PUT, getString(R.string.api) + "/accounts/password", body, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        Toast.makeText(getApplicationContext(), "Le mot de passe a été modifié avec succès", Toast.LENGTH_LONG).show();
                        Intent intent = new Intent(getApplicationContext(), MyProfileActivity.class);
                        startActivity(intent);
                    } else {
                        showError(response.getString("response"));
                    }
                } catch (JSONException e) {}
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        queue.add(request);
    }

    public void showError(String message) {
        this.errorModifyPasswordLabel.setText(message);
    }
}
