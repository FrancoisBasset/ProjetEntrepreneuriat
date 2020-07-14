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
    private Button getPremiumAccountButton;
    private TextView labelCompteMediumActive;
    private TextView labelComptePremiumActive;

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
        this.getPremiumAccountButton = findViewById(R.id.getPremiumAccountButton);
        this.labelCompteMediumActive = findViewById(R.id.labelCompteMediumActive);
        this.labelComptePremiumActive = findViewById(R.id.labelComptePremiumActive);

        if (StaticData.account.isNull("card")) {
            this.showWhenCardNull();
        } else {
            this.showWhenCardNotNull();
        }

        this.showHideMediumPremium();
    }

    public void showWhenCardNull() {
        this.labelSolde.setVisibility(View.INVISIBLE);
        this.deleteCardButton.setVisibility(View.INVISIBLE);
        this.getMediumAccountButton.setVisibility(View.INVISIBLE);
        this.getPremiumAccountButton.setVisibility(View.INVISIBLE);

        this.addCardButton.setEnabled(true);
    }

    public void showWhenCardNotNull() {
        this.labelSolde.setVisibility(View.VISIBLE);
        this.deleteCardButton.setVisibility(View.VISIBLE);
        this.getMediumAccountButton.setVisibility(View.VISIBLE);
        this.getPremiumAccountButton.setVisibility(View.VISIBLE);

        this.codeInput.setText("");
        this.expiryDateInput.setText("");
        this.addCardButton.setEnabled(false);

        try {
            this.labelSolde.setText("Solde : " + StaticData.account.getJSONObject("card").getString("balance") + " €");
        } catch (JSONException e) {}
    }

    public void showHideMediumPremium() {
        try {
            for (int i = 0; i < StaticData.account.getJSONArray("payments").length(); i++) {
                JSONObject payment = StaticData.account.getJSONArray("payments").getJSONObject(i);

                if (payment.getString("item").equals("medium")) {
                    this.getMediumAccountButton.setVisibility(View.INVISIBLE);
                    this.labelCompteMediumActive.setVisibility(View.VISIBLE);
                }

                if (payment.getString("item").equals("premium")) {
                    this.getPremiumAccountButton.setVisibility(View.INVISIBLE);
                    this.labelComptePremiumActive.setVisibility(View.VISIBLE);
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
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
                        showHideMediumPremium();
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

    public void getMedium(View view) {
        pay("medium", (float) 9.99);
    }

    public void getPremium(View view) {
        pay("premium", (float) 49.99);
    }

    public void pay(String item, float amount) {
        JSONObject body = new JSONObject();
        try {
            body.put("item", item);
            body.put("amount", amount);
        } catch (JSONException e) {}

        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, getString(R.string.api) + "/accounts/pay", body, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    if (response.getBoolean("success")) {
                        StaticData.account = response.getJSONObject("response");
                        showWhenCardNotNull();
                        showHideMediumPremium();
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