package francois.ecoleconfinee;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
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

public class CardActivity extends AppCompatActivity {
    private EditText codeInput;
    private EditText expiryDateInput;
    private Button addCardButton;
    private TextView labelSolde;
    private Button deleteCardButton;
    private Button getMediumAccountButton;
    private Button getPrediumAccountButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_card);

        this.codeInput = findViewById(R.id.codeInput);
        this.expiryDateInput = findViewById(R.id.expiryDateInput);
        this.addCardButton = findViewById(R.id.addCardButton);
        this.labelSolde = findViewById(R.id.labelSolde);
        this.deleteCardButton = findViewById(R.id.deleteCardButton);
        this.getMediumAccountButton = findViewById(R.id.getMediumAccountButton);
        this.getPrediumAccountButton = findViewById(R.id.getPremiumAccountButton);

        if (StaticData.account.isNull("card")) {
            this.showWhenCardNull();
        } else {
            this.showWhenCardNotNull();
        }
    }

    public void showWhenCardNull() {
        this.labelSolde.setVisibility(View.INVISIBLE);
        this.deleteCardButton.setVisibility(View.INVISIBLE);
        this.getMediumAccountButton.setVisibility(View.INVISIBLE);
        this.getPrediumAccountButton.setVisibility(View.INVISIBLE);

        this.addCardButton.setEnabled(true);
    }

    public void showWhenCardNotNull() {
        this.labelSolde.setVisibility(View.VISIBLE);
        this.deleteCardButton.setVisibility(View.VISIBLE);
        this.getMediumAccountButton.setVisibility(View.VISIBLE);
        this.getPrediumAccountButton.setVisibility(View.VISIBLE);

        this.codeInput.setText("");
        this.expiryDateInput.setText("");
        this.addCardButton.setEnabled(false);

        try {
            this.labelSolde.setText("Solde : " + StaticData.account.getJSONObject("card").getString("balance") + " €");
        } catch (JSONException e) {}
    }

    public void cancelAdd(View view) {
        this.codeInput.setText("");
        this.expiryDateInput.setText("");
    }

    public void addCard(View view) {
        if (this.codeInput.getText().length() != 16) {
            Toast.makeText(this, "Le code doit posséder 16 chiffres", Toast.LENGTH_LONG).show();
            return;
        }

        JSONObject body = new JSONObject();
        try {
            body.put("code", Utils.hash(this.codeInput.getText().toString()));
            body.put("expiryDate", this.expiryDateInput.getText());
        } catch (JSONException e) {}


        RequestQueue queue = Volley.newRequestQueue(this);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, getString(R.string.api) + "/accounts/card", body, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        StaticData.account = response.getJSONObject("response");
                        showWhenCardNotNull();
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

    public void deleteCard(View view) {
        this._deleteCard();
    }

    public void _deleteCard() {
        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.DELETE, getString(R.string.api) + "/accounts/card", new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        StaticData.account = response.getJSONObject("response");
                        showWhenCardNull();
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
}