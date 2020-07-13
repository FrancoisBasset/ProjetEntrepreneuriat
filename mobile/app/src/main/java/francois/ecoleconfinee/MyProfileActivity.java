package francois.ecoleconfinee;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;

public class MyProfileActivity extends AppCompatActivity {
    private TextView labelFirstNameLastName;
    private EditText firstNameInput;
    private EditText lastNameInput;
    private EditText mailInput;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_profile);

        this.labelFirstNameLastName = findViewById(R.id.labelFirstNameLastName);
        this.firstNameInput = findViewById(R.id.firstNameInput);
        this.lastNameInput = findViewById(R.id.lastNameInput);
        this.mailInput = findViewById(R.id.mailInput);

        String firstName = "", lastName = "", mail = "";

        try {
            firstName = StaticData.account.getString("firstName");
            lastName = StaticData.account.getString("lastName");
            mail = StaticData.account.getString("mail");
        } catch (JSONException e) {}

        this.labelFirstNameLastName.setText(firstName + " " + lastName);
        this.firstNameInput.setText(firstName);
        this.lastNameInput.setText(lastName);
        this.mailInput.setText(mail);
    }

    public void goToModifyPassword(View view) {
        Intent intent = new Intent(this, ModifyPasswordActivity.class);
        startActivity(intent);
    }
}
