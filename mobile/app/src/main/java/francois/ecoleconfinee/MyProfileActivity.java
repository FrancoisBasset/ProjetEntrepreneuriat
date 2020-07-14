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

public class MyProfileActivity extends AppCompatActivity {
    private TextView labelFirstNameLastName;
    private EditText firstNameInput;
    private EditText lastNameInput;
    private EditText organizationInput;
    private EditText mailInput;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_profile);

        this.labelFirstNameLastName = findViewById(R.id.labelFirstNameLastName);
        this.firstNameInput = findViewById(R.id.firstNameInput);
        this.lastNameInput = findViewById(R.id.lastNameInput);
        this.organizationInput = findViewById(R.id.organizationInput);
        this.mailInput = findViewById(R.id.mailInput);

        String firstName = "", lastName = "", mail = "", organization = "";

        try {
            firstName = StaticData.account.getString("firstName");
            lastName = StaticData.account.getString("lastName");
            organization = StaticData.account.getString("organizationName");
            mail = StaticData.account.getString("mail");
        } catch (JSONException e) {}

        this.labelFirstNameLastName.setText(firstName + " " + lastName);
        this.firstNameInput.setText(firstName);
        this.lastNameInput.setText(lastName);
        if (organization.equals("null")) {
            this.organizationInput.setText("");
        } else {
            this.organizationInput.setText(organization);
        }
        this.mailInput.setText(mail);
    }

    public void goToModifyPassword(View view) {
        Intent intent = new Intent(this, ModifyPasswordActivity.class);
        startActivity(intent);
    }

    public void modifyAccount(View view) {
        JSONObject body = new JSONObject();
        try {
            body.put("firstName", this.firstNameInput.getText());
            body.put("lastName", this.lastNameInput.getText());
            body.put("organizationName", this.organizationInput.getText());
            body.put("mail", this.mailInput.getText());
        } catch (JSONException e) {}

        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.PUT, getString(R.string.api) + "/accounts", body, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        StaticData.account = response.getJSONObject("response");
                        Toast.makeText(getApplicationContext(), "Le compte a été modifié avec succès", Toast.LENGTH_LONG).show();
                        changeFirstLast();
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

    public void deleteAccount(View view) {
        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.DELETE, getString(R.string.api) + "/accounts", new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        StaticData.account = null;
                        Intent intent = new Intent(getApplicationContext(), ConnectionActivity.class);
                        startActivity(intent);
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

    public void changeFirstLast() {
        this.labelFirstNameLastName.setText(this.firstNameInput.getText() + " " + this.lastNameInput.getText());
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(this, HomeActivity.class);
        startActivity(intent);
    }

    public void goToCard(View view) {
        Intent intent = new Intent(this, CardActivity.class);
        startActivity(intent);
    }
}
