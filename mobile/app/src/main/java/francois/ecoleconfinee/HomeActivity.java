package francois.ecoleconfinee;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import org.json.JSONException;

public class HomeActivity extends AppCompatActivity {
    private Button profileButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        this.profileButton = findViewById(R.id.profileButton);
        this.changeProfileLabel();
    }

    public void goToProfile(View view) {
        Intent intent  = new Intent(this, MyProfileActivity.class);
        startActivity(intent);
    }

    @Override
    protected void onResume() {
        super.onResume();
        this.changeProfileLabel();
    }

    public void changeProfileLabel() {
        try {
            this.profileButton.setText(StaticData.account.getString("firstName") + " " + StaticData.account.getString("lastName"));
        } catch (JSONException e) {}
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(this, ConnectionActivity.class);
        startActivity(intent);
    }
}
